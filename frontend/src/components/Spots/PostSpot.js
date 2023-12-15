import { useState } from 'react';

function PostSpotForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const NewSpot = {
      name,
      email,
      phone,
      submittedOn: new Date()
    };

    console.log(NewSpot);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <section>
      <h2>Create a new Spot</h2>
      <h3>Where's your place located?</h3>
      <p>Guests will only get your exact address once they booked a reservation.
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            id='name'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='text'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            id='phone'
            type='text'
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
}

export default PostSpotForm;
