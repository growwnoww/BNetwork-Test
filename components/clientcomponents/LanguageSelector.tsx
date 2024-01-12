import useCountry from '@/Hooks/useCountry';
import Select from 'react-select';
import Image from 'next/image';
import React from 'react';

const LanguageSelector = () => {
  const countries = useCountry();

  const countryOptions = countries?.map((country) => ({
    value: country.alpha3Code,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src={country.flag} alt={`${country.alpha3Code} flag`} height={20} width={20} />
        <span style={{ marginLeft: '8px' }}>{country.alpha3Code}</span>
      </div>
    ),
  }));

  const defaultCountry = countryOptions?.find((country) => country.value === 'IND');

  return (
    <div className='text-white w-32'>
      <form className='flex flex-row'>
        <Select
          defaultValue={defaultCountry}
          name="countrySelect"
          options={countryOptions}
          isSearchable={true}
          styles={{
            control: (provided: any, state: { isFocused: any }) => ({
              ...provided,
              backgroundColor: 'black',
              color: 'white !important',
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid yellow',
              borderRadius: '5px',
              boxShadow: state.isFocused ? '0 0 5px rgba(0, 0, 0, 0.1)' : '',
            }),
            option: (provided: any, state: { isFocused: any }) => ({
              ...provided,
              background: state.isFocused ? '#ddd' : '',
              color: 'white',
              fontWeight: 'bold',
            }),
            menu: (provided: any) => ({
              ...provided,
              backgroundColor: 'black',
              borderRadius: '5px',
              overflow: 'hidden',
            }),
            list: (provided: any) => ({
              ...provided,
              '::-webkit-scrollbar': {
                width: '8px',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: 'red',
                borderRadius: '15px',
              },
              '::-webkit-scrollbar-track': {
                backgroundColor: 'black',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: 'yellow black',
              maxHeight: '200px',
              overflowY: 'auto',
            }),
          } as any}
        />
      </form>
    </div>
  );
};

export default LanguageSelector;
