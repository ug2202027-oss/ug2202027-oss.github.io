<?php
require_once 'helpers.php';
$mysqli = $GLOBALS['mysqli'];

$hasSellerStatus = db_has_column('users', 'seller_status');
$hasDistrict = db_has_column('users', 'district');
$sellerStatusClause = $hasSellerStatus ? " AND (u.seller_status = 'approved' OR u.seller_status IS NULL)" : "";

$q = trim($_GET['q'] ?? '');
$bricks = [];

if ($q !== '') {
    $like = '%' . $q . '%';
    $sellerId = ctype_digit($q) ? (int)$q : 0;
  $whereParts = [
    'b.name LIKE ?',
    'b.description LIKE ?',
    'u.username LIKE ?',
  ];
  $params = [$like, $like, $like];
  $types = 'sss';
  if ($hasDistrict) {
    $whereParts[] = 'u.district LIKE ?';
    $params[] = $like;
    $types .= 's';
  }
  $whereParts[] = 'u.id = ?';
  $params[] = $sellerId;
  $types .= 'i';

  $stmt = $mysqli->prepare("
        SELECT b.*, u.username as seller_name
        FROM bricks b
        JOIN users u ON b.seller_id = u.id
        WHERE b.quantity > 0
      $sellerStatusClause
      AND (" . implode(' OR ', $whereParts) . ")
        ORDER BY b.created_at DESC
    ");
  $bricks = [];
  stmt_bind_params($stmt, $types, $params);
  if ($stmt->execute()) {
    $bricks = stmt_fetch_all_assoc($stmt);
  }
} else {
  $res = $mysqli->query("SELECT b.*, u.username as seller_name FROM bricks b JOIN users u ON b.seller_id = u.id WHERE b.quantity > 0$sellerStatusClause ORDER BY b.created_at DESC LIMIT 24");
  $bricks = $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Brick Store — Home</title>
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/lightbox.css">
</head>
<body>
  <div class="container">
    <h1>Brick Store</h1>

    <?php if (!empty($_SESSION['msg'])): ?>
      <div class="error"><?php echo esc($_SESSION['msg']); unset($_SESSION['msg']); ?></div>
    <?php endif; ?>

    <p>
      <?php if (is_logged_in()): $u = current_user(); ?>
        Hello <?php echo esc($u['username']); ?> (<?php echo esc($u['type']); ?>) —
        <?php if ($u['type'] === 'seller'): ?>
          <a href="seller_dashboard.php">Dashboard</a> |
          <a href="seller_report.php">My Report</a> |
        <?php elseif ($u['type'] === 'customer'): ?>
          <a href="customer_dashboard.php">Dashboard</a> |
          <a href="cart.php">Cart</a> |
        <?php else: ?>
          <a href="admin_dashboard.php">Admin Dashboard</a> |
          <a href="all_sellers_report.php">All Sellers Report</a> |
        <?php endif; ?>
        <a href="logout.php">Logout</a>
      <?php else: ?>
        <a href="login.php">Login</a> |
        <a href="register.php?type=customer">Register as Customer</a> |
        <a href="register.php?type=seller">Register as Seller</a>
      <?php endif; ?>
    </p>

    <form method="get" action="index.php" style="margin:12px 0;">
      <input type="search" name="q" placeholder="Search bricks, seller name/id, or district" value="<?php echo esc($q); ?>" style="width:70%; padding:8px;">
      <button type="submit" style="padding:8px 12px;">Search</button>
      <?php if ($q !== ''): ?><a href="index.php" style="margin-left:12px;">Clear</a><?php endif; ?>
    </form>

    <?php if ($q !== ''): ?>
      <h2>Search results for "<?php echo esc($q); ?>" (<?php echo count($bricks); ?>)</h2>
    <?php else: ?>
      <h2>Recent Bricks</h2>
    <?php endif; ?>

    <?php if (empty($bricks)): ?>
      <p>No items found. Try a different keyword.</p>
    <?php else: ?>
      <div class="grid">
        <?php foreach ($bricks as $b):
            $images = get_brick_images($b['id']);
        ?>
          <div class="card">
            <?php if (!empty($images)): ?>
              <a href="<?php echo esc($images[0]['file_path']); ?>" class="lightbox-link" data-brick="<?php echo (int)$b['id']; ?>" data-index="0" data-caption="<?php echo esc($images[0]['caption']); ?>">
                <img src="<?php echo esc($images[0]['file_path']); ?>" class="thumb" alt="">
              </a>
              <?php if (count($images) > 1): ?>
                <div class="gallery-thumbs">
                  <?php foreach ($images as $idx => $img): ?>
                    <a href="<?php echo esc($img['file_path']); ?>" class="lightbox-link small" data-brick="<?php echo (int)$b['id']; ?>" data-index="<?php echo (int)$idx; ?>" data-caption="<?php echo esc($img['caption']); ?>">
                      <img src="<?php echo esc($img['file_path']); ?>" class="thumb" style="height:60px" alt="">
                    </a>
                  <?php endforeach; ?>
                </div>
              <?php endif; ?>
            <?php elseif ($b['image']): ?>
              <img src="<?php echo esc($b['image']); ?>" class="thumb" alt="">
            <?php endif; ?>

            <?php if (!empty($b['photo_detail'])): ?><p class="photo-detail"><?php echo esc($b['photo_detail']); ?></p><?php endif; ?>
            <h3><?php echo esc($b['name']); ?></h3>
            <p>By: <?php echo esc($b['seller_name']); ?></p>
            <p><?php echo nl2br(esc($b['description'])); ?></p>
            <p>Price: $<?php echo number_format($b['price'],2); ?> — In stock: <?php echo (int)$b['quantity']; ?></p>
            <form method="post" action="add_to_cart.php">
              <input type="hidden" name="brick_id" value="<?php echo (int)$b['id']; ?>">
              <label>Qty: <input type="number" name="qty" value="1" min="1" max="<?php echo (int)$b['quantity']; ?>"></label>
              <button type="submit">Add to cart</button>
            </form>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

  </div>

<script src="assets/js/lightbox.js" defer></script>
</body>
</html>
