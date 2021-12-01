const Error = ({ message }: { message: string }) => {
  return (
    <div className="post post-error">
      {message}
    </div>
  )
}

export default Error