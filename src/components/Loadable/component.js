import Loadable from 'react-loadable'
import './component.scss'
import Loading from '../RouteLoading'

export default (Component) => {
  return (
    Loadable({
      loader: () => Component,
      loading: Loading,
    })
  )
}



