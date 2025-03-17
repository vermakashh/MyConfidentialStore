// profile_user/profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const userInitials = document.getElementById('userInitials');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const ordersList = document.getElementById('ordersList');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeBtn = document.querySelector('.close');
    const editProfileForm = document.getElementById('editProfileForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Modal functionality
    editProfileBtn.onclick = function() {
        editProfileModal.style.display = 'block';
        nameInput.value = userName.textContent;
        emailInput.value = userEmail.textContent;
    }

    closeBtn.onclick = function() {
        editProfileModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    }

    // Get user profile data
    async function fetchProfileData() {
        try {
            const response = await fetch('/api/profile');
            
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching profile data:', error);
            return null;
        }
    }

    // Update UI with profile data
    async function updateProfileUI() {
        const profileData = await fetchProfileData();
        
        if (!profileData) {
            alert('Failed to load profile data. Please try again later.');
            return;
        }
        
        const { user, orders } = profileData;
        
        // Update user info
        userName.textContent = user.name;
        userEmail.textContent = user.email;
        
        // Set user initials in avatar
        const initials = user.name
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase();
        userInitials.textContent = initials;
        
        // Display orders
        displayOrders(orders);
    }

    // Display orders in the UI
    function displayOrders(orders) {
        console.log('Rendering orders:', orders); // Debug log
        
        if (!orders || orders.length === 0) {
            ordersList.innerHTML = `
                <div class="no-orders">
                    <p>You haven't placed any orders yet.</p>
                    <p>Go shopping and come back to see your order history!</p>
                </div>
            `;
            return;
        }
        
        let ordersHTML = '';
        
        orders.forEach(order => {
            const orderDate = new Date(order.orderDate).toLocaleDateString();
            
            // Get status class
            let statusClass = '';
            switch(order.status) {
                case 'pending':
                    statusClass = 'status-pending';
                    break;
                case 'processing':
                    statusClass = 'status-processing';
                    break;
                case 'shipped':
                    statusClass = 'status-shipped';
                    break;
                case 'delivered':
                    statusClass = 'status-delivered';
                    break;
            }
            
            let itemsHTML = '';
            if (order.items && order.items.length > 0) {
                order.items.forEach(item => {
                    itemsHTML += `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.title}" class="item-image" onerror="this.src='/images/placeholder.jpg';">
                            <div class="item-details">
                                <div class="item-title">${item.title}</div>
                                <div class="item-price">₹${item.price.toFixed(2)} × ${item.quantity}</div>
                            </div>
                        </div>
                    `;
                });
            } else {
                itemsHTML = '<p>No items in this order</p>';
            }
            
            ordersHTML += `
                <div class="order-card">
                    <div class="order-header">
                        <div>Order #${order.orderNumber || 'Unknown'}</div>
                        <div class="order-date">${orderDate}</div>
                        <div class="order-status ${statusClass}">${order.status ? (order.status.charAt(0).toUpperCase() + order.status.slice(1)) : 'Unknown'}</div>
                    </div>
                    <div class="order-items">
                        ${itemsHTML}
                    </div>
                    <div class="order-total">
                        Total: ₹${order.total ? order.total.toFixed(2) : '0.00'}
                    </div>
                </div>
            `;
        });
        
        ordersList.innerHTML = ordersHTML;
    }

    // Update profile form submission
    editProfileForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (!name || !email) {
            alert('Please fill in all required fields');
            return;
        }
        
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }
            
            const updatedUser = await response.json();
            
            // Update UI
            userName.textContent = updatedUser.name;
            userEmail.textContent = updatedUser.email;
            
            // Update initials
            const initials = updatedUser.name
                .split(' ')
                .map(name => name[0])
                .join('')
                .toUpperCase();
            userInitials.textContent = initials;
            
            // Close modal
            editProfileModal.style.display = 'none';
            
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.message);
        }
    });

    // Initialize the page
    updateProfileUI();
});