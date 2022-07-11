import React, { useState, useEffect } from 'react'
import countryApi from '../api/countryApi'
import CountryAdd from './CountryAdd'

export default function CountryView() {
    const [country, setCountry] = useState([])
    const [display, setDisplay] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [values, setValues] = useState({
        country_id: '',
        country_name: '',
        region_id: undefined
    })

    useEffect(() => {
        countryApi.get().then(data => {
            setCountry(data)
        })
        setRefresh(false)
    }, [refresh])

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = async () => {
        const payload = {
            country_id: (values.country_id),
            country_name: (values.country_name),
            region_id: (values.region_id)
        }
        await countryApi.create(payload)
            .then(() => {
                setDisplay(false)
                setRefresh(true)
                window.alert('Data Successfully Insert')
            })
    }

    const onDelete = async (id) => {
        countryApi.deleted(id)
            .then(() => {
                setRefresh(true)
                window.alert('Data Successfully Delete')
            })
    }

    return (
        <div>
            <div>
                <h2>List Country</h2>
                <button onClick={() => setDisplay(true)}> Add Country </button>
                {
                    display ?
                        <CountryAdd
                            onSubmit={onSubmit}
                            handleOnChange={handleOnChange}
                            setDisplay={setDisplay}
                        />
                        :
                        <>
                            <table>
                                <th>Country ID</th>
                                <th>Country Name</th>
                                <th>Region ID</th>
                                <tbody>
                                    {
                                        country && country.map(cou => (
                                            <tr key={cou.country_id}>
                                                <td>{cou.country_id}</td>
                                                <td>{cou.country_name}</td>
                                                <td>{cou.region_id}</td>
                                                <button onClick={() => onDelete(cou.country_id)}> Delete Country </button>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                }
            </div>
        </div>
    )
}
