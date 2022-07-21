import withInstall from 'src/utils/withInstall'
import InputGroupComponent from './InputGroup.vue'
import Input from './index.vue'
import './styles'

export type { IProps as IInputProps, IInputRefExpose } from './types'

export const InputGroup = withInstall(InputGroupComponent)

export default withInstall(Input)
