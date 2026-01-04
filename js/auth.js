// Authentication functionality

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
        // Try to authenticate with API
        const response = await apiRequest('/auth/login', 'POST', { email, password });
        
        if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            showNotification('Login successful!');
            
            // Redirect to home or previous page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Login error:', error);
        
        // For demo purposes, allow any login
        const mockUser = {
            id: 1,
            name: email.split('@')[0],
            email: email
        };
        
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        showNotification('Login successful! (Demo Mode)');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!');
        return;
    }
    
    try {
        // Try to register with API
        const response = await apiRequest('/auth/register', 'POST', {
            firstName,
            lastName,
            email,
            password
        });
        
        if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            
            showNotification('Registration successful!');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Registration error:', error);
        
        // For demo purposes, allow any registration
        const mockUser = {
            id: Date.now(),
            name: `${firstName} ${lastName}`,
            email: email
        };
        
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        showNotification('Registration successful! (Demo Mode)');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Social login handlers (demo only)
document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.btn-social');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`${provider} login is not implemented in this demo`);
        });
    });
});
