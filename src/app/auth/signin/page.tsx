'use client'

const SigninPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    }

    const response = await fetch('http://localhost:3001/api/v1/auth/signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }).then((response) => response.json())
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" name="username"></input>
      <input type="password" placeholder="password" name="password"></input>
      <button type="submit">Submit</button>
    </form>
  )
}

export default SigninPage
