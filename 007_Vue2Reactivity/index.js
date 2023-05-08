const user = {
  name: '张三',
  birth: '1990-01-01',
}

observe(user)

function showFirstName() {
  document.querySelector('#firstName').textContent = `姓：${user.name[0]}`
}
function showLastName() {
  document.querySelector('#lastName').textContent = `名：${user.name.slice(1)}`
}
function showAge() {
  const birthday = new Date(user.birth)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const age = today.getFullYear() - birthday.getFullYear()
  document.querySelector('#age').textContent = `年龄：${age} 岁`
}

call(showFirstName)
call(showLastName)
call(showAge)

user.name = '李四'
user.birth = '2000-01-01'
