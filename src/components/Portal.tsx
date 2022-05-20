import ReactDom from 'react-dom'

interface IProps {
  children: React.ReactNode
}

export default function Portal({ children }: IProps) {
  return ReactDom.createPortal(children, document.getElementById('modal') as HTMLElement)
}
