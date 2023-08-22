import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useHttpClient from '../../shared/hooks/use-http'
import LoadingComponent from '../../shared/UI/LoadingComponent'
import Modal from '../../shared/UI/Modal'
import Container from '../../shared/UI/Container'
import Button from '../../shared/UI/Button'
import ItemList from '../../item/components/ItemList'
import PersonalData from '../components/PersonalData'
import AuthCtx from '../../shared/context/auth-context'
import './Profile.css'
import Grid from '../../shared/UI/Grid'
import Avatar from '../components/Avatar'
import Title from '../../shared/UI/Title'

export default function Profile() {
    const {userId} = useParams()
    const [successStatus, setSuccessStatus] = useState(null)
    const [userData, setUserData] = useState(null)
    const {isLoading, errorStatus, clearError, sendRequest} = useHttpClient()
    const navigate = useNavigate()
    const {token, logout} = useContext(AuthCtx)

    useEffect(() => {
        const fetchUser = async () => {
        const loadedItem = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`,
            'GET',
            {'Authorization': `Bearer ${token}`})
            setUserData(loadedItem?.user)
        }
        fetchUser()
    },[])

    const deleteProfile = async () => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`,
            'DELETE',
            {'Authorization': `Bearer ${token}`}
        )
        setSuccessStatus('User deleted correctly!')
        setTimeout(() => {
            setSuccessStatus(null)
            logout()
            navigate('/browse-item')
        }    , 1500)
    }

    if (userData) {
        return (
            <>
                {!errorStatus && successStatus && <Modal success show={successStatus} content={successStatus}/>}
                {isLoading && <LoadingComponent />}
                {errorStatus && <Modal error show={errorStatus} clearModal={clearError} content={errorStatus} />}
                <Container>
                    <Grid>
                        <div className='col-1'>
                            <Title>Profile</Title>
                            <Avatar />
                            <PersonalData userData={userData} />
                            <Button style={{marginTop: "1rem", width: 'fit-content'}} onClick={deleteProfile}>Delete Profile</Button>
                            <Link to={`/edit-user/${userId}`} className={'btn inverse'} style={{marginTop: "1rem", width: 'fit-content'}}>Edit User</Link>
                        </div>
                        <div className='col-2'>
                            <Title>Your Items</Title>
                            <ItemList items={userData.items} />
                        </div>
                    </Grid>
                </Container>
            </>
        )
    }
    return (
        <>
            {isLoading && <LoadingComponent />}
            {errorStatus && <Modal error  show={errorStatus} clearModal={clearError} content={errorStatus} />}
            <Container>
                <h1>No user found</h1>
            </Container>
        </>
    )
}
