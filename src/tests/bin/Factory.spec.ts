import Factory from '@binaries/Factory'

describe('', () => {
  const infoSpy = jest.spyOn(console, 'info').mockImplementation()

  afterAll(() => {
    infoSpy.mockRestore()
  })

  describe('Testa a existência de propriedades em uma classe', () => {
    it('deve possuir a função "build"', () => {
      expect(Factory).toHaveProperty('build')
    })

    it('deve possuir a função "get"', () => {
      expect(Factory).toHaveProperty('get')
    })

    it('deve possuir a função "post"', () => {
      expect(Factory).toHaveProperty('post')
    })

    it('deve possuir a função "getCustom"', () => {
      expect(Factory).toHaveProperty('getCustom')
    })

    it('deve possuir a função "postCustom"', () => {
      expect(Factory).toHaveProperty('postCustom')
    })

    it('deve possuir a função "loadModules"', () => {
      expect(Factory).toHaveProperty('loadModules')
    })

    it('deve possuir a propriedade "Server"', () => {
      expect(Factory).toHaveProperty('Server')
    })

    it('deve possuir a propriedade "Config"', () => {
      expect(Factory).toHaveProperty('Config')
    })
  })

  describe('Testa execução das funções principais', () => {
    it('deve carregar as rotas dos módulos', (done) => {
      Factory.loadModules()
      expect(infoSpy).toHaveBeenCalledTimes(Factory.modulesImported)
      done()
    })
  })
})
