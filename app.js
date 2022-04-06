const express = require('express')

const app =express()
let db = 'db.json'
let fs = require('fs')
let {getAllB,setAllB} = require('./books')


app.get('/',(req,res)=>{
    res.render('homepage')
})

app.set('view engine','pug')

app.use(express.urlencoded({ extended: false }))

app.use('/static',express.static('public'))



app.listen(10000,err=>{
    if(err) console.log(err)

    console.log('Server is runnig on port 10000...')

})

app.get('/allbooks',(req,res)=>{
    let allbooks = getAllB(db)
    res.render('allbooks',{allbooks:allbooks})
})

app.get('/favorites',(req,res)=>{
    let allbooks =getAllB(db)
    res.render('favorites',{favoritebooks:allbooks})
})

app.get('/newbooks',(req,res)=>{
    res.render('newbooks')
})


app.post('/newbooks', (req, res) => {
    const id = req.body.id
	const title = req.body.title
	const description = req.body.description
    const author = req.body.author

	if ( id.trim() !== '' && title.trim() !== '' && description.trim() !== '' && author.trim() !== '' ) {
		
		fs.readFile(db, (err, data) => {
			if (err) throw err

			const books = JSON.parse(data)

			books.push({
				id: id(),
				title: title,
				description: description,
                author:author
			})

			fs.writeFile(db, JSON.stringify(books), err => {
				if (err) throw err

				res.render('newbooks', { success: true })
			})

		})

	} else {
		res.render('newbooks', { error: true })
	}	
})
