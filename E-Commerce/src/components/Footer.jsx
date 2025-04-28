import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-cyan-300 fixed bottom-0 w-full shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 text-sm text-center md:text-left">
          &copy; 2025 Anurag Code's. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
            Terms
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
