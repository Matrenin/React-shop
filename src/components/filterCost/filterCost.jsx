import React, { useState } from 'react';
import './filterCost.scss';


export function FilterCost(props) {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [value, setVal] = useState('');

    function changeMin(event) {
        if (+event.target.value >= max) {
            setMin(event.target.value);
            setMax(event.target.value);
        } else {
            setMin(event.target.value)
        }
    }
    function changeMax(event) {
        if (+event.target.value < min) {
            setMax(event.target.value);
            setMin(event.target.value)
        } else {
            setMax(event.target.value);
        }
    }
    function resetFilter() {
        setMin("");
        setMax("");
        setVal("");
        props.watchChange("", "", "")
    }

    function sortImpressions(event) {
        setVal(event.target.value);
        props.watchChange(min, max, value)
    }

    return (
        <>
            <div className='filterBox'>
                <h5>Сортировать по цене</h5>
                <div className='boxForm'>
                    <div className='radioBox'>
                        <label htmlFor="radioUp" >
                            <input id="radioUp" type="radio" className='radio' name="radio" value="2"
                                checked={value === '2' ? true : false}
                                onChange={sortImpressions} />
                            <span>по возрастанию</span>
                        </label>
                        <label htmlFor="radioDown">
                            <input id="radioDown" className='radio' type="radio" name="radio" value="1"
                                checked={value === '1' ? true : false}
                                onChange={sortImpressions}
                            />
                            <span>по убыванию</span>
                        </label>
                    </div>
                    <div className='inputsBox'>
                        <input type="number" step={100} id='minCost' min="0" value={min} onChange={changeMin} className='inputFilter min' />
                        <input type="number" step={100} id='maxCost' min="0" value={max} onChange={changeMax} className='inputFilter max' />
                    </div>
                    <button onClick={() => props.watchChange(min, max, value)} className='submit' >Применить</button>
                    <button onClick={resetFilter} className='submit' >Сбросить</button>
                </div>

            </div>
        </>
    )
}