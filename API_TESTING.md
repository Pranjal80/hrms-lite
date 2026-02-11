# API Testing Guide

This guide shows how to test the HRMS Lite API endpoints using curl, Postman, or the built-in Swagger UI.

## 🎯 Base URL

- **Local**: `http://localhost:8000`
- **Production**: `https://your-deployed-backend.com`

## 🔍 Testing Methods

### Method 1: Swagger UI (Recommended for Quick Testing)

1. Start the backend server
2. Open browser: `http://localhost:8000/docs`
3. You'll see an interactive API documentation
4. Click on any endpoint to test it
5. Click "Try it out" → Fill in parameters → Click "Execute"

### Method 2: Using curl (Command Line)

#### Health Check
```bash
curl http://localhost:8000/health
```

#### Get All Employees
```bash
curl http://localhost:8000/api/employees
```

#### Create Employee
```bash
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering"
  }'
```

#### Get Employee by ID
```bash
curl http://localhost:8000/api/employees/1
```

#### Delete Employee
```bash
curl -X DELETE http://localhost:8000/api/employees/1
```

#### Mark Attendance
```bash
curl -X POST http://localhost:8000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "date": "2026-02-11",
    "status": "Present"
  }'
```

#### Get All Attendance
```bash
curl http://localhost:8000/api/attendance
```

#### Get Attendance with Filters
```bash
# Filter by employee
curl "http://localhost:8000/api/attendance?employee_id=1"

# Filter by date range
curl "http://localhost:8000/api/attendance?start_date=2026-02-01&end_date=2026-02-11"

# Combined filters
curl "http://localhost:8000/api/attendance?employee_id=1&start_date=2026-02-01"
```

#### Get Dashboard Summary
```bash
curl http://localhost:8000/api/dashboard
```

### Method 3: Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection "HRMS Lite"
3. Add requests for each endpoint:

**Example: Create Employee**
- Method: POST
- URL: `http://localhost:8000/api/employees`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

### Method 4: Using Python Requests

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Create employee
employee_data = {
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering"
}

response = requests.post(
    f"{BASE_URL}/api/employees",
    json=employee_data
)

print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

# Get all employees
response = requests.get(f"{BASE_URL}/api/employees")
employees = response.json()
print(f"Total employees: {len(employees)}")

# Mark attendance
attendance_data = {
    "employee_id": employees[0]["id"],
    "date": "2026-02-11",
    "status": "Present"
}

response = requests.post(
    f"{BASE_URL}/api/attendance",
    json=attendance_data
)
print(f"Attendance marked: {response.json()}")
```

## 📋 Test Scenarios

### Scenario 1: Complete Employee Lifecycle

```bash
# 1. Create employee
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "Alice Johnson",
    "email": "alice@company.com",
    "department": "HR"
  }'

# 2. Get all employees (verify creation)
curl http://localhost:8000/api/employees

# 3. Mark attendance
curl -X POST http://localhost:8000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "date": "2026-02-11",
    "status": "Present"
  }'

# 4. Get employee with attendance
curl http://localhost:8000/api/employees/1

# 5. Delete employee
curl -X DELETE http://localhost:8000/api/employees/1
```

### Scenario 2: Validation Testing

```bash
# Test duplicate employee ID
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "Bob Smith",
    "email": "bob@company.com",
    "department": "IT"
  }'
# Expected: 400 Bad Request - Employee ID already exists

# Test invalid email
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP002",
    "full_name": "Charlie Brown",
    "email": "invalid-email",
    "department": "Finance"
  }'
# Expected: 422 Validation Error

# Test empty fields
curl -X POST http://localhost:8000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "",
    "full_name": "",
    "email": "test@test.com",
    "department": ""
  }'
# Expected: 422 Validation Error
```

### Scenario 3: Attendance Management

```bash
# Create multiple employees first
for i in {1..3}; do
  curl -X POST http://localhost:8000/api/employees \
    -H "Content-Type: application/json" \
    -d "{
      \"employee_id\": \"EMP00$i\",
      \"full_name\": \"Employee $i\",
      \"email\": \"emp$i@company.com\",
      \"department\": \"Department $i\"
    }"
done

# Mark attendance for all
curl -X POST http://localhost:8000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{"employee_id": 1, "date": "2026-02-11", "status": "Present"}'

curl -X POST http://localhost:8000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{"employee_id": 2, "date": "2026-02-11", "status": "Absent"}'

curl -X POST http://localhost:8000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{"employee_id": 3, "date": "2026-02-11", "status": "Present"}'

# Get dashboard summary
curl http://localhost:8000/api/dashboard
# Expected: present_today: 2, absent_today: 1
```

## 🧪 Expected Responses

### Success Responses

**Create Employee (201 Created)**
```json
{
  "id": 1,
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

**Get All Employees (200 OK)**
```json
[
  {
    "id": 1,
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering"
  }
]
```

**Dashboard Summary (200 OK)**
```json
{
  "total_employees": 5,
  "total_attendance_records": 15,
  "present_today": 4,
  "absent_today": 1
}
```

### Error Responses

**Duplicate Employee (400 Bad Request)**
```json
{
  "detail": "Employee ID 'EMP001' already exists"
}
```

**Validation Error (422 Unprocessable Entity)**
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

**Not Found (404 Not Found)**
```json
{
  "detail": "Employee with ID 999 not found"
}
```

## 🔧 Automated Testing Script

Save this as `test_api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:8000"

echo "🧪 Testing HRMS Lite API"
echo "========================"

# Health check
echo -e "\n✓ Testing health endpoint..."
curl -s $BASE_URL/health | jq

# Create employee
echo -e "\n✓ Creating employee..."
EMPLOYEE=$(curl -s -X POST $BASE_URL/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "TEST001",
    "full_name": "Test User",
    "email": "test@test.com",
    "department": "QA"
  }')
echo $EMPLOYEE | jq

EMPLOYEE_ID=$(echo $EMPLOYEE | jq -r '.id')

# Mark attendance
echo -e "\n✓ Marking attendance..."
curl -s -X POST $BASE_URL/api/attendance \
  -H "Content-Type: application/json" \
  -d "{
    \"employee_id\": $EMPLOYEE_ID,
    \"date\": \"$(date +%Y-%m-%d)\",
    \"status\": \"Present\"
  }" | jq

# Get dashboard
echo -e "\n✓ Getting dashboard..."
curl -s $BASE_URL/api/dashboard | jq

# Cleanup
echo -e "\n✓ Cleaning up..."
curl -s -X DELETE $BASE_URL/api/employees/$EMPLOYEE_ID

echo -e "\n✅ All tests completed!"
```

Run with:
```bash
chmod +x test_api.sh
./test_api.sh
```

## 📊 Performance Testing

Use Apache Bench (ab) for load testing:

```bash
# Test employee creation endpoint
ab -n 100 -c 10 -p employee.json -T application/json \
  http://localhost:8000/api/employees

# Test get all employees
ab -n 1000 -c 50 http://localhost:8000/api/employees
```

## 🐛 Debugging Tips

1. **Check Server Logs**: Monitor the terminal running the backend
2. **Validate JSON**: Use [jsonlint.com](https://jsonlint.com) for JSON validation
3. **Check Status Codes**: 
   - 200/201: Success
   - 400: Bad Request (client error)
   - 404: Not Found
   - 422: Validation Error
   - 500: Server Error
4. **Use Verbose Mode**: Add `-v` flag to curl for detailed output

```bash
curl -v http://localhost:8000/api/employees
```

## ✅ Testing Checklist

- [ ] Health endpoint works
- [ ] Can create employee
- [ ] Can get all employees
- [ ] Can get single employee
- [ ] Can delete employee
- [ ] Duplicate employee ID rejected
- [ ] Invalid email rejected
- [ ] Can mark attendance
- [ ] Can filter attendance
- [ ] Dashboard shows correct stats
- [ ] Deleting employee cascades to attendance

---

Happy Testing! 🚀
