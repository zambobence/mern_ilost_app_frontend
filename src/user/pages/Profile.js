import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttpClient from '../../shared/hooks/use-http'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import Modal from '../../shared/UI/Modal'
import Container from '../../shared/UI/Container'
import Button from '../../shared/UI/Button'
import ItemList from '../../item/components/ItemList'
import PersonalData from '../components/PersonalData'

let token = '64dda0cc75b10255b1e90715'

export default function Profile() {
    const {userId} = useParams()
    const [userData, setUserData] = useState(null)
    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchItem = async () => {
        const loadedItem = await sendRequest(
            `http://localhost:5000/user/${userId}`,
            'GET',
            {'Authorization': `Bearer ${token}`})
            setUserData(loadedItem?.user)
        }
        fetchItem()
    },[])

    const deleteProfile = async () => {
        sendRequest(
            `http://localhost:5000/user/${userId}`,
            'DELETE',
            {'Authorization': `Bearer ${token}`}
        )
        navigate('/browse-item')
    }

    if (userData) {
        return (
            <>
                {isLoading && <LoadingComponent />}
                {errorStatus && <Modal show={errorStatus} clearModal={clearError} content={errorStatus} />}
                <div>
                    <h1>Profile</h1>
                    <PersonalData userData={userData} />
                    <ItemList items={userData.items} />
                    <Button onClick={deleteProfile}>Delete Profile</Button>
                </div>
            </>
        )
    }


  return (
    <>
        {isLoading && <LoadingComponent />}
        {errorStatus && <Modal show={errorStatus} clearModal={clearError} content={errorStatus} />}
        <Container>
            <h1>No user found</h1>
        </Container>
    </>
  )
}
