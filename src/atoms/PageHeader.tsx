interface PageHeaderProps {
  title: string
  className?: string
}

const PageHeader = ({ title, className = '' }: PageHeaderProps) => {
  return (
    <h1
      className={`pb-2 w-max mx-auto track-wider text-lg lg:text-2xl font-bold text-center border-b border-primary font-nunito ${className}`}
    >
      {title}
    </h1>
  )
}

export default PageHeader
