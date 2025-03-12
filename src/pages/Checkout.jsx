const Checkout = () => {
    return (
      <div className="flex h-screen w-full font-jakarta"> 
        <div className="w-1/2 flex-row items-center px-24 py-16 bg-white">
          <div>
            <h2 className="text-xl font-bold pb-3">MY INFORMATION</h2>
            <div className="text-sm">
              <h3>Akbar Zaidan Rohman</h3>
              <h3>akbarzaidanr2@gmail.com</h3>
              <h3>+62812 3456 7890</h3>
              <h3>31/05/2002</h3>
            </div>
          </div>

          <div className="pt-12">
            <h2 className="text-xl font-bold pb-3">DELIVERY</h2>
            <div className="mb-6 flex gap-6">
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">First Name</label>
                <h3 alt="">Akbar Zaidan</h3>
              </div>
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">Last Name</label>
                <h3 alt="">Rohman</h3>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-black text-sm font-semibold mb-2">Address</label>
              <h3 alt="">Jalan Anggrek 1 Gedung tiga limat tujuh sembilan tiga asd  asd as d asd as d asd sa d asd  asd as das d asd </h3>
            </div>

            <div className="mb-6 flex gap-6">
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">Province</label>
                <h3 alt="">Rohman</h3>
              </div>
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">City</label>
                <h3 alt="">Rohman</h3>
              </div>
            </div>

            <div className="mb-6 flex gap-6">
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">Province</label>
                <h3 alt="">Jakarta</h3>
              </div>
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">City</label>
                <h3 alt="">Jakarta Barat</h3>
              </div>
            </div>

            <div className="mb-6 flex gap-6">
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">District</label>
                <h3 alt="">Kebon Jeruk</h3>
              </div>
              <div className="w-1/2">
                <label className="block text-black text-sm font-semibold mb-2">Post Code</label>
                <h3 alt="">11210</h3>
              </div>
            </div>

            <form action="" className="py-3">
              <div >
                <h2 className="text-xl font-bold pt-3">Shipping Method</h2>
                <select name="" id="" className="w-full text-sm px-4 py-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">JNE</option>
                  <option value="">J&T</option>
                </select>
              </div>

              <div className="py-3">
                <h2 className="text-xl font-bold pt-3">Payment Method</h2>
                <select name="" id="" className="w-full text-sm px-4 py-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">JNE</option>
                  <option value="">J&T</option>
                  <option value="">POS Indonesia</option>
                  <option value="">Sicepat</option>
                  <option value="">Lion Parcel</option>
                  <option value="">Ninja Express</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#4F39F6] font-semibold text-white my-10 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                BUY
              </button>
            </form>
          </div>
          
        </div>

        <div className="w-1/3 flex items-center justify-center bg-white">

        </div>
      </div>
    );
  };
  
  export default Checkout;
  