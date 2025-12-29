import User from '../models/User.js';

const initAdmin = async () => {
    try {
        const adminEmail = 'lovelyyasar135@gmail.com';
        const adminPassword = '@Lovelyyasar!1375!';
        
        const existingAdmin = await User.findOne({ email: adminEmail });
        
        if (!existingAdmin) {
            console.log('🚀 Initializing Default Admin...');
            await User.create({
                name: 'Lovely Yasar',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
                subscriptionTier: 'premium'
            });
            console.log('✅ Default Admin Created Successfully.');
        } else {
            // Force sync password and roles to ensure hashing is correct and permissions are set
            existingAdmin.password = adminPassword;
            existingAdmin.role = 'admin';
            existingAdmin.subscriptionTier = 'premium';
            await existingAdmin.save();
            console.log('✅ Admin credentials and permissions synchronized.');
        }
    } catch (error) {
        console.error('❌ Error initializing admin:', error.message);
    }
};

export default initAdmin;
