const loginCode = () => {
    let code = Math.floor(100000 + Math.random() * 900000)

    code = `${code}`.slice(0, 6)

    return code
}


module.exports = { loginCode }