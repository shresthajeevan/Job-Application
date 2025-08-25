# JobApp - Full Stack Job Portal

A modern job portal built with Angular frontend and Spring Boot microservices backend.

## 🏗️ Architecture

### Backend Microservices
- **CompanyMS** (Port 8081): Manages company information
- **JobMS** (Port 8082): Manages job postings with company data
- **ReviewMS** (Port 8083): Manages company reviews

### Frontend
- **Angular 17**: Modern UI with Tailwind CSS
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Type-safe development

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven
- Node.js 18 or higher
- PostgreSQL (for database)

### Database Setup
1. Create PostgreSQL databases:
```sql
CREATE DATABASE company;
CREATE DATABASE job;
CREATE DATABASE review;
```

2. Update database credentials in `application.properties` files if needed.

### Backend Setup
1. Start all microservices:
```bash
./start-backend.sh
```

Or start them individually:
```bash
# Company Microservice
cd Backend/companyms
./mvnw spring-boot:run

# Job Microservice (in new terminal)
cd Backend/jobms
./mvnw spring-boot:run

# Review Microservice (in new terminal)
cd Backend/reviewms
./mvnw spring-boot:run
```

### Frontend Setup
1. Install dependencies:
```bash
cd Frontend/jobapp-ui
npm install
```

2. Start the development server:
```bash
ng serve
```

3. Open your browser and navigate to `http://localhost:4200`

## 📁 Project Structure

```
JobApp/
├── Backend/
│   ├── companyms/          # Company microservice
│   ├── jobms/             # Job microservice
│   └── reviewms/          # Review microservice
├── Frontend/
│   └── jobapp-ui/         # Angular application
├── start-backend.sh       # Backend startup script
└── README.md
```

## 🔧 API Endpoints

### Company Microservice (Port 8081)
- `GET /companies` - Get all companies
- `GET /companies/{id}` - Get company by ID
- `POST /companies` - Create new company
- `PUT /companies/{id}` - Update company
- `DELETE /companies/{id}` - Delete company

### Job Microservice (Port 8082)
- `GET /jobs` - Get all jobs with company data
- `GET /jobs/{id}` - Get job by ID
- `POST /jobs` - Create new job
- `PUT /jobs/{id}` - Update job
- `DELETE /jobs/{id}` - Delete job

### Review Microservice (Port 8083)
- `GET /reviews?companyId={id}` - Get reviews by company ID
- `GET /reviews/{id}` - Get review by ID
- `POST /reviews?companyId={id}` - Create new review
- `PUT /reviews/{id}` - Update review
- `DELETE /reviews/{id}` - Delete review

## 🎨 Features

### Frontend Features
- **Dashboard**: Overview of jobs and companies
- **Job Listings**: Browse and search jobs
- **Company Listings**: View company information
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean and intuitive interface

### Backend Features
- **Microservices Architecture**: Scalable and maintainable
- **RESTful APIs**: Standard HTTP endpoints
- **Database Integration**: PostgreSQL with JPA
- **CORS Configuration**: Cross-origin support
- **Error Handling**: Proper HTTP status codes

## 🛠️ Development

### Adding New Features
1. **Backend**: Add new endpoints in respective microservice
2. **Frontend**: Create new components and services
3. **Integration**: Update services to call new APIs

### Code Style
- **Backend**: Follow Spring Boot conventions
- **Frontend**: Follow Angular style guide
- **Database**: Use meaningful table and column names

## 🚀 Deployment

### Backend Deployment
1. Build JAR files:
```bash
cd Backend/companyms && ./mvnw clean package
cd Backend/jobms && ./mvnw clean package
cd Backend/reviewms && ./mvnw clean package
```

2. Deploy JAR files to your server

### Frontend Deployment
1. Build for production:
```bash
cd Frontend/jobapp-ui
ng build --configuration production
```

2. Deploy the `dist` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console logs for errors
2. Verify database connections
3. Ensure all services are running
4. Check CORS configuration

## 🔮 Future Enhancements

- User authentication and authorization
- Job application tracking
- Email notifications
- Advanced search and filtering
- Company profiles with images
- Job recommendations
- Analytics dashboard 