const validatior = {
  email: function (email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  },

  password: function (password) {
    return password.length > 6;
  },

  userName: function (name) {
    return name.length > 0;
  }
};

validateRegisterForm = function () {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!validatior.email(email)) {
    alert('Email không hợp lệ!!!');
    return false;
  }

  if (!validatior.password(password)) {
    alert('Mật khẩu phải lớn hơn 6 ký tự!!!');
    return false;
  }

  if (!validatior.userName(name)) {
    alert('Tên không được để trống!!!');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Mật khẩu không trùng khớp!!!');
    return false;
  }

  return true;
}