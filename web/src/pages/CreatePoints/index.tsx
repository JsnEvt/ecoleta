import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';
import axios from 'axios';

import './styles.css'

import logo from '../../assets/logo.svg'

//para array ou objeto, precisamos informar o tipo da variavel

interface Item {
  id: number
  title: string
  image_url: string
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })


  const [selectedUf, setselectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords

      setSelectedPosition([latitude, longitude])
    })
  }, [])

  useEffect(() => {
    api.get('items').then(res => {
      setItems(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
      const ufInitials = res.data.map(uf => uf.sigla)
      setUfs(ufInitials)
    })
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }

    axios
    .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(res => {
        const cityNames = res.data.map(city => city.nome)
        setCities(cityNames);
    });
   }, [selectedUf]);


  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value

    setselectedUf(uf)
  }


  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value

    setSelectedCity(city)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target
    setFormData ({...formData, [name]: value})
  }

  function handleSelectItem (id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)
    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    }else {
      setSelectedItems([...selectedItems, id])
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const {name, email, whatsapp} = formData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = selectedPosition
    const items = selectedItems

    const data = {
      name,
      email, 
      whatsapp, 
      uf,
      city,
      latitude,
      longitude,
      items,
    }
  await api.post('points', data)
  alert('Ponto de coleta criado!')
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="EColeta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br />ponto de coleta</h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="name">E-mail</label>
              <input type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>

          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endere??o</h2>
            <span>O criador do mapa esta enfrentando problemas<br />
              com a guerra na Ucrania.
            </span>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select 
                name="city" 
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
                >
                {cities.map(city => (
                <option key={city} value={city}>{city}</option>

                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className='items-grid'>
            {items.map(item => (
              <li key={item.id} 
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected': ''}
                  >
                  {/* o onClick passa o parametro precisando da arrow function para nao dar erro. */}
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            )
            )}
          </ul>

        </fieldset>
        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  )

}

export default CreatePoint