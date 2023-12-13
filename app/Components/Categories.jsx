"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CatCard from './CatCard'

const Categories = () => {
    const [cats,setCats] =useState([])
    useEffect(()=>{
        axios.get(`https://sw-games.net/api/categories`).then(response =>{
            setCats(response.data.cats)
        })
    },[])
  return (
    <div>
        <div className='m-auto max-w-[1280px]'>
            <div className='grid grid-cols-4 gap-2 xs:grid-cols-1 mx-4 sm:grid-cols-2 md:grid-cols-3'>
                {
                    cats.map(cat =>(
                    <CatCard id={cat.id} name={cat.name} image ={cat.image}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Categories