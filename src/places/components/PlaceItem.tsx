import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/UIElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'

import { Place } from '../../shared/models/types'
import { bp } from '../../shared/styled/vars'

import AlertModal from '../../shared/components/UIElements/AlertModal'
import { AuthContext } from '../../shared/context/AuthContext'
import { useRequest } from '../../shared/hooks/useRequest'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

export const StyledPlaceItem = styled.li`
  margin: 1em 0;
  /* for abs-positioning spinner inside PlaceItem */
  position: relative;
  .place-item__image {
    width: 100%;
    height: 12.5rem;
    @media (min-width: ${bp.desktop}) {
      height: 20rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .place-item__info {
    margin: 1em auto;
    text-align: center;
    h2 {
      font-size: 1.2rem;
      color: var(--text-accent);
    }
    h3 {
      font-size: 1rem;
    }
  }

  .place-item__actions {
    padding: 0 1em 1em;
    text-align: right;
  }
`

type PlaceItemProps = Place

const MapModal = styled(Modal)`
  .map-container {
    width: 100%;
    height: 16rem;
    @media (min-width: ${bp.desktop}) {
      height: 20rem;
    }
  }
  .place-item__modal-footer {
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0.5em;
    }
  }
`

const PlaceItem = (
  props: PlaceItemProps & {
    key: string
    handleConfirmDelete: (placeId: string) => void
  }
) => {
  const auth = useContext(AuthContext)
  const { sendRequest, isLoading, error, clearError } = useRequest()

  const [showMap, setShowMap] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const openMap = () => setShowMap(true)
  const closeMap = () => setShowMap(false)
  const openDeleteConfirm = () => setShowDeleteConfirm(true)
  const closeDeleteConfirm = () => setShowDeleteConfirm(false)
  const confirmDelete = async () => {
    closeDeleteConfirm()
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/places/${props.id}`
      await sendRequest(url, 'DELETE', undefined, {
        Authorization: `Bearer ${auth.token}`,
      })
      props.handleConfirmDelete(props.id)
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      <MapModal
        show={showMap}
        header={props.address}
        headerClass="place-item__modal-header"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-footer"
        footer={<Button onClick={closeMap}>CLOSE</Button>}
        clearModal={closeMap}
      >
        <div className="map-container">
          <Map center={props.location} zoom={16} />
        </div>
      </MapModal>
      <AlertModal
        show={showDeleteConfirm}
        clearModal={closeDeleteConfirm}
        header={'Delete Place'}
        footer={
          <>
            <Button large type="button" onClick={closeDeleteConfirm}>
              CANCEL
            </Button>
            <Button large onClick={confirmDelete} danger>
              DELETE
            </Button>
          </>
        }
      >
        <p>Are you sure to delete this place?</p>
        <p>
          You <strong>cannot undo</strong> this action.
        </p>
      </AlertModal>
      <StyledPlaceItem>
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMap}>VIEW ON MAP</Button>
            {auth.isLoggedIn && auth.userId === props.creator && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && auth.userId === props.creator && (
              <Button danger onClick={openDeleteConfirm}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </StyledPlaceItem>
    </React.Fragment>
  )
}

export default PlaceItem
