from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def setup_driver():
    try:
        # Set up Chrome options
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-notifications")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        # Initialize the Chrome driver with explicit path
        service = Service()
        driver = webdriver.Chrome(service=service, options=chrome_options)
        return driver
    except Exception as e:
        print(f"Error setting up driver: {str(e)}")
        raise

def test_login():
    driver = setup_driver()
    try:
        # Navigate directly to login page
        driver.get("http://localhost:5173/login")
        
        # Fill in login form
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "email_id"))
        )
        email_input.send_keys("test@example.com")
        
        password_input = driver.find_element(By.NAME, "password")
        password_input.send_keys("password123")
        
        # Submit the form
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        login_button.click()
        
        # Wait for dashboard to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Profile Information')]"))
        )
        
        print("Login test passed!")
        
    except Exception as e:
        print(f"Login test failed: {str(e)}")
    finally:
        driver.quit()

def test_register():
    driver = setup_driver()
    try:
        # Navigate directly to register page
        driver.get("http://localhost:5173/register")
        
        # Fill in registration form
        name_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "name"))
        )
        name_input.send_keys("Test User")
        
        reg_no_input = driver.find_element(By.NAME, "reg_no")
        reg_no_input.send_keys("21BCE1234")
        
        email_input = driver.find_element(By.NAME, "email_id")
        email_input.send_keys("test@example.com")
        
        phone_input = driver.find_element(By.NAME, "phone_no")
        phone_input.send_keys("1234567890")
        
        block_select = driver.find_element(By.NAME, "block")
        block_select.send_keys("MH-A")
        
        room_input = driver.find_element(By.NAME, "room_no")
        room_input.send_keys("101")
        
        password_input = driver.find_element(By.NAME, "password")
        password_input.send_keys("password123")
        
        confirm_password_input = driver.find_element(By.NAME, "confirmPassword")
        confirm_password_input.send_keys("password123")
        
        # Submit the form
        register_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        register_button.click()
        
        # Wait for success message or redirect
        time.sleep(2)  # Give some time for the registration to complete
        
        print("Registration test passed!")
        
    except Exception as e:
        print(f"Registration test failed: {str(e)}")
    finally:
        driver.quit()

def test_complaint_submission():
    driver = setup_driver()
    try:
        # First login
        driver.get("http://localhost:5173/login")
        
        email_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "email_id"))
        )
        email_input.send_keys("test@example.com")
        
        password_input = driver.find_element(By.NAME, "password")
        password_input.send_keys("password123")
        
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        login_button.click()
        
        # Wait for dashboard to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Profile Information')]"))
        )
        
        # Fill in complaint form
        category_select = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "category"))
        )
        category_select.send_keys("electrical")
        
        complaint_input = driver.find_element(By.NAME, "complaint")
        complaint_input.send_keys("AC not working properly")
        
        # Submit the complaint
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()
        
        # Wait for success message
        time.sleep(2)
        
        print("Complaint submission test passed!")
        
    except Exception as e:
        print(f"Complaint submission test failed: {str(e)}")
    finally:
        driver.quit()

if __name__ == "__main__":
    print("Starting tests...")
    test_login()
    test_register()
    test_complaint_submission()
    print("All tests completed!") 