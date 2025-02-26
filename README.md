BlogPortal

Introduction

BlogPortal is a dynamic platform designed to streamline the creation, management, and dissemination of blogs and announcements. By providing an intuitive interface, BlogPortal empowers users to share their thoughts, updates, and stories with a global audience. Whether you're an individual blogger, an organization, or an administrator, BlogPortal offers comprehensive tools to facilitate content approval, distribution, and engagement. Through fostering collaboration between writers, editors, and readers, BlogPortal creates a vibrant community where ideas flourish and voices are heard, ensuring that valuable information reaches those who seek it.


---

Prerequisites

Before running the project, ensure you have the following installed on your system:

.NET 6 SDK

Node.js and npm

Angular CLI

Microsoft SQL Server



---

Backend Setup (ASP.NET Core + Entity Framework Core)

1. Navigate to the Backend Directory

cd dotnetapp

2. Restore Dependencies

dotnet restore

3. Run the Application

dotnet run

The application will run on port 8080.

4. Build and Check for Errors

dotnet build

5. Clean the Project (if errors persist)

dotnet clean
dotnet build

6. Install Entity Framework Core

dotnet new tool-manifest
dotnet tool install --local dotnet-ef --version 6.0.6
dotnet dotnet-ef

7. Database Migrations

dotnet dotnet-ef migrations add "InitialSetup"
dotnet dotnet-ef database update

8. SQL Server Configuration

Open a new terminal and log in to SQL Server

sqlcmd -U sa

Password: examlyMssql@123

Create and Use Database

USE appdb;
GO

Insert Sample Data

INSERT INTO TableName (Column1, Column2, ...) VALUES ('Value1', 'Value2', ...);
GO

9. Connection String for MS SQL Server

Ensure the following connection string is used in your application:

User ID=..;password=.......; server=localhost;Database=appdb;trusted_connection=false;Persist Security Info=False;Encrypt=False;


---

Frontend Setup (Angular)

1. Navigate to the Frontend Directory

cd angularapp

2. Install Dependencies

npm install

3. Develop the Application

Write the code inside the src/app folder.

Create necessary components using the following command:

npx ng g c <component-name>

Create services using the following command:

npx ng g s <service-name>


4. Run the Application

Ensure the backend is running before proceeding.

Click Run Test Case to execute test cases.

5. View the Application

Click PORT 8081 to view the application output.

6. Troubleshooting

If any error persists while running the app, ensure dependencies are installed and check the console logs for error messages.


---

Notes

Ensure the backend is running on port 8080 before running the test cases.

The database name should be appdb.

Keep your connection string secure in production environments.



