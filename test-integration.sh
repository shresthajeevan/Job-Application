#!/bin/bash

echo "🧪 Testing JobApp Integration"
echo "=============================="

# Test Company Microservice
echo "Testing Company Microservice..."
curl -X GET http://localhost:8081/companies
echo -e "\n"

# Test Job Microservice
echo "Testing Job Microservice..."
curl -X GET http://localhost:8082/jobs
echo -e "\n"

# Test Review Microservice
echo "Testing Review Microservice..."
curl -X GET "http://localhost:8083/reviews?companyId=1"
echo -e "\n"

echo "✅ Integration tests completed!"
echo ""
echo "If you see empty arrays [], that's normal - the databases are empty."
echo "Start the frontend and use the 'Add Sample Data' button to populate the database." 