document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า
  // ดึงค่าจากฟอร์ม
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // ตรวจสอบการกรอกข้อมูล
  if (!email || !password) {
    alert('Please fill in both fields.');
    return;
  }

  // URL ของ API สำหรับตรวจสอบการล็อกอิน
  const apiUrl = 'http://20.205.24.139:3001/login'; // URL ของ Back-End

  // ส่งข้อมูลไปยัง API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }), // ส่งข้อมูลในรูปแบบ JSON
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful') {
        // หากล็อกอินสำเร็จ
        localStorage.setItem('userEmail', email);// บันทึกอีเมลใน Local Storage
      
        window.location.href = 'index.html'; // เปลี่ยนหน้าไปยัง index.html
      } else {
        // หากล็อกอินล้มเหลว
        alert(data.message || 'Invalid email or password.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
});
