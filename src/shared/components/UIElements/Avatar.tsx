import styled from 'styled-components'

const StyledAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

type AvatarProps = {
  src: string
  alt: string
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <StyledAvatar>
      <img src={props.src} alt={props.alt} />
    </StyledAvatar>
  )
}

export default Avatar
