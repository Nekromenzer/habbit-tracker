/* eslint-disable react/prop-types */

const PageWrapper = ({ children, header }) => {
  return (
    <div className='h-screen w-full text-2xl p-4'>
      <h2 className="text-blue-500 font-semibold mb-6">{header}</h2>
      {children}
    </div>
  )
}

export default PageWrapper
