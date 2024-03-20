

export const ProfileLoader = async () => {
    await fetch('http://localhost:3000/api/auth/profile')
        .then(res => console.log(res))
        .catch(error => {
            if(error) {
                console.log(error)
                return null
            }
        })
        return null
}
