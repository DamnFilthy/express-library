const request = require("supertest");
const app = require("../../index");

describe('test api books', () => {
    beforeAll(async () => {
        await request(app).delete('/api/__test__/data')
    })

    test('GET /api/books: return 200 and empty array', async () => {
        await request(app)
            .get('/api/books')
            .expect(200, [])
    })

    test('GET /api/books/:id: return 404 for not existing book', async () => {
        await request(app)
            .get('/api/books/1234')
            .expect(404)
    })

    test('POST /api/books: should not create data without title', async () => {
        await request(app)
            .post('/api/books')
            .send({title: ''})
            .expect(404)

        await request(app)
            .get('/api/books')
            .expect(200, [])
    })

    let createdBook = null;
    test('POST /api/books: should create data', async () => {
        const createResponse = await request(app)
            .post('/api/books')
            .send({
                title: 'test title',
                description: 'test description',
                authors: 'test authors',
                favorite: 'test favorite',
                fileCover: 'test fileCover',
                fileName: 'test fileName'
            })
            .expect(201)

        createdBook = createResponse.body

        expect(createdBook).toEqual({
            fileCover: 'test fileCover',
            fileName: 'test fileName',
            authors: 'test authors',
            description: 'test description',
            favorite: 'test favorite',
            title: 'test title',
            id: expect.any(String),
        })

        await request(app)
            .get('/api/books')
            .expect(200, [createdBook])
    })

    test('PATCH /api/books/:id: should not update data without title', async () => {
        await request(app)
            .patch('/api/books/' + createdBook.id)
            .send({title: ''})
            .expect(400)

        await request(app)
            .get('/api/books')
            .expect(200, [createdBook])
    })

    test('PATCH /api/books/:id: cannot update data, book not found', async () => {
        await request(app)
            .patch('/api/books/test-id')
            .send({title: 'test update data'})
            .expect(404)
    })

    test('PATCH /api/books/:id: should update with correct data', async () => {
        await request(app)
            .patch('/api/books/' + createdBook.id)
            .send({title: 'test update new data'})
            .expect(204)

        await request(app)
            .get('/api/books/' + createdBook.id)
            .expect(200, {
                ...createdBook,
                title: 'test update new data'
            })
    })

    test('PUT /api/books/:id: should not update data without title', async () => {
        await request(app)
            .put('/api/books/' + createdBook.id)
            .send({title: ''})
            .expect(400)
    })

    test('PUT /api/books/:id: cannot update data, book not found', async () => {
        await request(app)
            .put('/api/books/test-id')
            .send({title: 'test update data'})
            .expect(404)
    })

    test('PUT /api/books/:id: should update with correct data', async () => {
        await request(app)
            .put('/api/books/' + createdBook.id)
            .send({title: 'test update new data'})
            .expect(204)

        await request(app)
            .get('/api/books/' + createdBook.id)
            .expect(200, {
                id: createdBook.id,
                title: 'test update new data',
            })
    })

    test('DELETE /api/books/:id: should not delete, book not found', async () => {
        await request(app)
            .delete('/api/books/test-book-id')
            .expect(404)
    })

    test('DELETE /api/books/:id: should delete book with correct id', async () => {
        await request(app)
            .delete('/api/books/' + createdBook.id)
            .expect(201)

        await request(app)
            .get('/api/books' + createdBook.id)
            .expect(404)

        await request(app)
            .get('/api/books')
            .expect(200, [])
    })
})
