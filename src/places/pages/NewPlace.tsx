import NewPlaceForm from '../components/NewPlaceForm'
import FormPage from '../../shared/components/formElements/FormPage'

const NewPlace: React.FC = (props) => {
  const header = (
    <header>
      <h2>Add a New Place</h2>
      <p>Share your favorite places with others!</p>
    </header>
  )
  return (
    <FormPage header={header}>
      <NewPlaceForm />
    </FormPage>
  )
}

export default NewPlace
