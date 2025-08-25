#!/bin/bash

echo "Starting JobApp Microservices..."

# Start Company Microservice
echo "Starting Company Microservice on port 8081..."
cd Backend/companyms
./mvnw spring-boot:run &
COMPANY_PID=$!
cd ../..

# Start Job Microservice
echo "Starting Job Microservice on port 8082..."
cd Backend/jobms
./mvnw spring-boot:run &
JOB_PID=$!
cd ../..

# Start Review Microservice
echo "Starting Review Microservice on port 8083..."
cd Backend/reviewms
./mvnw spring-boot:run &
REVIEW_PID=$!
cd ../..

echo "All microservices started!"
echo "Company MS PID: $COMPANY_PID"
echo "Job MS PID: $JOB_PID"
echo "Review MS PID: $REVIEW_PID"
echo ""
echo "Services are running on:"
echo "- Company MS: http://localhost:8081"
echo "- Job MS: http://localhost:8082"
echo "- Review MS: http://localhost:8083"
echo ""
echo "To stop all services, run: kill $COMPANY_PID $JOB_PID $REVIEW_PID" 