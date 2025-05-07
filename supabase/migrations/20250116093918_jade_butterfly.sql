-- Create the database
CREATE DATABASE IF NOT EXISTS document_upload_db;
USE document_upload_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL UNIQUE,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  mpin VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  type ENUM('aadhar', 'pan', 'driving_license', 'voter_id') NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  document_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create birth table
CREATE TABLE IF NOT EXISTS birth (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME NOT NULL,
  place_of_birth VARCHAR(255) NOT NULL,
  mother_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create atul_pension_yojana table
CREATE TABLE IF NOT EXISTS atul_pension_yojana (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  application_number VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create otp_requests table
CREATE TABLE IF NOT EXISTS otp_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  mobile_number VARCHAR(15) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  aadhaar VARCHAR(12) NOT NULL,
  mobile VARCHAR(10) NOT NULL,
  address TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
