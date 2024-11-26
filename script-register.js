document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();  // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้าจอ

  // ดึงข้อมูลจากฟอร์ม
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cfpassword = document.getElementById('Confirm_password').value;

  // ตรวจสอบว่าอีเมลและรหัสผ่านไม่ว่าง
  if (!email || !password || !cfpassword) {
    alert("Please fill in all fields.");
    return;
  }

  // ตรวจสอบว่า email มีเครื่องหมาย @
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // ตรวจสอบว่า password กับ confirm password ตรงกัน
  if (password !== cfpassword) {
    alert('Passwords do not match.');
    return;
  }

  // กำหนด URL ของ API (ใช้ IP หรือโดเมนจริง)
  const apiUrl = 'http://20.205.24.139:3001/register';  // หรือ https://api.example.com/register

  // ส่งข้อมูลไปยัง API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),  // ส่งข้อมูลในรูปแบบ JSON
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong');
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.message === 'User registered successfully.') {
      // ถ้าการสมัครสำเร็จ
      alert('Register successful');
      // เปลี่ยนหน้าไปที่หน้าล็อคอิน
      window.location.href = 'login.html';  // เปลี่ยนเป็น URL ของหน้าล็อคอินที่คุณต้องการ
    } else {
      // ถ้าการสมัครไม่สำเร็จ
      alert('Registration failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error with the registration process. Please try again later.');
  });
});
