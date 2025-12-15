45782-1-project-3

🚀 Project Setup & Run Guide

⚠️ Important – LocalStack image initialization
The S3 bucket is created by the backend code, but the images are initialized by LocalStack itself.
Make sure the file localstack/init/ready.d/s3-init.sh is executable (chmod +x).
If the script is not executable, LocalStack will start without uploading the initial images, and the application will load an empty bucket.

This project contains Frontend (React), Backend (Node + Express + Sequelize), MySQL, and LocalStack (S3 mock) — all running together via Docker Compose.

Below is the exact procedure to fully set up the system.

🧩 1. Environment Variables (Backend)
The backend requires two runtime environment variables:
JWT_SECRET=jwtSecret
APP_SECRET=secret

👉 Running the backend manually (dev mode):
JWT_SECRET=jwtSecret APP_SECRET=secret npm run dev

👑 2. Admin Login
Admin account included in the seed:
Email: ido1@mail.com

Password: 123456

👤 3. Regular User Login
Email: tomer10@mail.com

Password: 123456
Email: gil5@mail.com

Password: 123456

📁 4. LocalStack S3 Bucket
The project uses this S3 bucket:
images.sunnydb.com

Images are uploaded automatically on startup from:
localstack/init/images/

The upload script:
localstack/init/ready.d/s3-init.sh

Make sure it is executable:
chmod +x localstack/init/ready.d/s3-init.sh

🚀 5. Running the Entire Project with Docker Compose
Start everything from scratch:
docker compose down -v
docker compose build --no-cache
docker compose up

After startup:
MySQL is seeded
S3 bucket is created and pre-filled with images
Backend is connected to LocalStack
Frontend loads all images from S3 correctly
