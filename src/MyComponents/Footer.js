import React from 'react'

export const Footer = () => {
    let footerStyle = {
        position: 'relative',
        width:'100%'
    }
    return (
        <footer className="bg-dark text-light py-3" style={footerStyle}>
            <p className="text-center mb-0">
                Copyright &copy; MyTodolist.com  
            </p>
        </footer>
    )
}
