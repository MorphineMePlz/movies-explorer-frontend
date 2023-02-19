import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import "./Profile.css";

export default function Profile({ handleLogout, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  const {
    register,
    watch,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
    mode: 'onChange',
  })

  const name = watch('name')
  const email = watch('email')

  const handleSubmitProfile = () => {
    handleUpdateUser({ name, email })
  }

  const InitialStateDisable = (currentUser.name === name && currentUser.email === email)
  const activeStyleValidateButton = (currentUser.name !== name || currentUser.email !== email)

  return (
    <form className='profile' onSubmit={handleSubmit(() => { handleSubmitProfile() })}>
      <h1 className="profile__heading">{`Привет, ${currentUser.name || ''}!`}</h1>
      <div className="profile__box">
        <div className="profile__table-line">
          <p className="profile__placeholder">Имя</p>
          <input
            type="text"
            className={errors?.name ? 'profile__input_error' : 'profile__input'}
            {...register('name', {
              required: 'обязательное поле',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              },
              maxLength: {
                value: 20,
                message: 'максимум 20 символов'
              },
              pattern: {
                value: /^[A-Za-zА-Яа-яЁё /h -]+$/,
                message: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис'
              }
            })}
            value={name}
          />
        </div>
        <div className='profile__input-error'> {
          errors?.name && <span className='profile__input-error-text'>{errors?.name?.message || 'Что-то пошло не так...'}</span>
        }</div>
        <div className="profile__table-line">
          <p className="profile__placeholder">E-mail</p>
          <input
            type="email"
            className={errors?.email ? 'profile__input_error' : 'profile__input'}
            {...register('email', {
              required: 'обязательное поле',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'некорректный емайл'
              },
            })}
            value={email}
          />
        </div>
      </div>
      <div className='profile__input-error-email'> {
        errors?.email && <span className='profile__input-error-text-email'>{errors?.email?.message || 'Что-то пошло не так...'}</span>
      }</div>
      <div className="profile__button-box">
        <button type="submit" className={
          (isValid && activeStyleValidateButton) ? (
            'profile__button profile__button_active'
          ) : (
            'profile__button profile__button_unactive'
          )} disabled={InitialStateDisable || !isValid}>
          Редактировать
        </button>
        <button
          onClick={handleLogout}
          type="button"
          className="profile__button profile__button_logout"
        >
          Выйти из аккаунта
        </button>
      </div>
    </form>
  );
}
