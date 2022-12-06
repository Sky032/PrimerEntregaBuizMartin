let prodList = [
  {
    title:'Anakin',
    description: 'El equilibrio',
    price:999,
    timestamp: Date.now(),
    code:20313256455,
    img:'link',
    stock:1,
    id:1
  },
  {
    title:'Leia',
    description: 'La bondad',
    price:999,
    timestamp: Date.now(),
    code:20313256403,
    img:'link',
    stock:5,
    id:2
  }
]

let isAdmin=true;

export const getProducts = (req, res) => {
  res.json({
    status:200,
    prodList
  })
}

export const getProdById = (req, res) => {
  const {id} = req.params
  const prod = prodList.find(el => el.id === Number(id))
  res.json({
    status: 200,
    id: id,
    prod
  })
}


export const postProduct = (req, res) => {
  const {title, description, price, timestamp, code, img, stock} = req.body
  const product = { title:title, description:description, price:price, timestamp:Date.now(), code:code, img:img, stock:stock, id: prodList.length+1 }
  if(isAdmin){
    prodList.push(product)
    res.json({
      status: 200,
      prodList
    })
  } else {
    res.json({
      message:'no estas autorizado para realizar este tipo de peticion'
    })
  }

}


export const editProduct = (req, res) => {
  const {id} = req.params
  const {title, description, price, timestamp, code, img, stock} = req.body
  if(isAdmin){
    const prods = prodList.filter(el => el.id !== Number(id))
    prods.push({title: title, description: description, price: price, timestamp:Date.now(), code:code, img:img, stock:stock, id: Number(id)})
    res.json({
      status: 200,
      prodList: prods 
    })
  } else {
    res.json({
      message: 'no estas autorizado para realizar este tipo de peticion'
    })
  }
}

export const deleteProduct = (req, res) => {
  const { id } = req.params
  let isAdmin = true;
  if(isAdmin){
    const prods = prodList.filter(el => el.id !== Number(id))
    res.json({
      status:200,
      prodList: prods
    })
  } else {
    res.json({
      message:'no estas autorizado para realizar este tipo de peticion'
    })
  }
}