import config from '../config';
import { UserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';

const seedAdmin = async () => {
    try {
        const adminEmail = config.admin_email || 'admin@ph.com';
        const adminPassword = config.admin_password || 'admin123';

        const adminUser = {
            email: adminEmail,
            password: adminPassword,
            name: 'Admin',
            role: UserRole.ADMIN,
            isActive: true,
            clientInfo: {
                device: 'pc' as const,
                browser: 'Server',
                ipAddress: '127.0.0.1',
                pcName: 'localhost',
                os: 'Linux',
                userAgent: 'Seed Script',
            }
        };

        // Check if an admin user exists by role or email
        const isAdminExist = await User.findOne({
            $or: [
                { role: UserRole.ADMIN },
                { email: adminEmail }
            ]
        });

        if (!isAdminExist) {
            await User.create(adminUser);
            console.log(`🌱 Admin user (${adminEmail}) seeded successfully in database.`);
        } else {
            console.log(`🌱 Admin user (${isAdminExist.email}) already exists. Skipping seed.`);
        }
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
    }
};

export default seedAdmin;
