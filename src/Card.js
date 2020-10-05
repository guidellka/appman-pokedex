import React, { useEffect, useState, Fragment } from 'react'
import HappyIcon from './cute.png';

const Card = ({ pokemon, buttonText, active }) => {

    const { name, hp, attacks, weaknesses, imageUrl } = pokemon

    const [energy, setEnergy] = useState(0)
    const [strength, setStrength] = useState(0)
    const [weakness, setWeakness] = useState(0)
    const [damage, setDamage] = useState(0)
    const [happiness, setHappiness] = useState(0)

    useEffect(() => {
        calculateCard()
    })

    useEffect(() => {
        // สูตรผิด ?
        // setHappiness(((energy / 10) + (damage / 10) + 10 - weakness) / 5)
        setHappiness(energy / 20)
    }, [energy, weakness, damage])

    const calculateCard = async () => {
        if (attacks !== undefined) {
            setEnergy(hp <= 100 ? hp : 100)
            setStrength(attacks.length * 50 <= 100 ? attacks.length * 50 : 100)
            // weaknesses วิธีคิดผิด ?
            setWeakness(weaknesses.length * 100 <= 100 ? weaknesses.length * 100 : 100)
            let temp = 0
            attacks.map(i => {
                temp += parseInt(i.damage, [0, 1])
            })
            setDamage(temp)
        }
    }

    const showHappiness = () => {
        let count = 0
        let result = []
        while (count < happiness) {
            result.push(<img src={HappyIcon} key={count} alt="happy icon" width="40px" style={{ margin: "10px 5px 0 0" }} />)
            count++
        }
        return result
    }

    return (
        <Fragment>
            <div className="card">
                <img src={imageUrl} alt={name} className="card-img"/>
                <div className="card-detail" >
                    <div className="button-card" onClick={active} >
                        {buttonText}
                    </div>
                    <div className="pokemon-name" >{name}</div>
                    <div className="dp-flex">
                        <div className="status-style">
                            HP
                    </div>
                        <div className="tube">
                            <div className="fill-tube" style={{ width: `${energy}%` }}></div>
                        </div>
                    </div>
                    <div className="dp-flex">
                        <div className="status-style">
                            STR
                    </div>
                        <div className="tube">
                            <div className="fill-tube" style={{ width: `${strength}%` }}></div>
                        </div>
                    </div>
                    <div className="dp-flex">
                        <div className="status-style">
                            WEAK
                    </div>
                        <div className="tube">
                            <div className="fill-tube" style={{ width: `${weakness}%` }}></div>
                        </div>
                    </div>
                    {showHappiness()}
                </div>
            </div>
        </Fragment>
    )
}

export default Card
