import { BSpline, createEquidistantVector, N } from './BSpline'
import { BasePoints } from './BasePoints'
import paper from 'paper'
import { createCanvas } from 'canvas'

beforeAll(() => {
  const canvas = (createCanvas(200, 200) as unknown) as HTMLCanvasElement
  paper.setup(canvas)
})

describe('N function', () => {
  describe('with equidistant base vector', () => {
    it('should create equidistant vectors', () => {
      expect(createEquidistantVector(2, 3)).toHaveLength(6)
      expect(createEquidistantVector(1, 3)).toHaveLength(5)
    })

    describe('example from lecture 4 slides 29 and following', () => {
      const u_i = createEquidistantVector(2, 3)

      for (let i = 0; i < 5; i++) {
        it(`should return 1 for u in [${i}, ${
          i + 1
        }) for i = ${i}, r = 0`, () => {
          expect(N(i, 0, i, u_i)).toBe(1)
          expect(N(i, 0, i + 0.5, u_i)).toBe(1)
          expect(N(i, 0, i + 0.9, u_i)).toBe(1)
          expect(N(i, 0, i + 1, u_i)).toBe(0)
        })

        if (i < 4) {
          it(`should return 0 for u = ${i}, i = ${i}, r = 1`, () => {
            expect(N(i, 1, i, u_i)).toBe(0)
          })
          it(`should return 0.5 for u = ${i}.5, i = ${i}, r = 1`, () => {
            expect(N(i, 1, i + 0.5, u_i)).toBe(0.5)
          })
          it(`should return 0.5 for u = ${i + 1}.5, i = ${i}, r = 1`, () => {
            expect(N(i, 1, i + 1.5, u_i)).toBe(0.5)
          })
        }
      }
    })
  })

  describe('with varying distances in the base vector', () => {
    describe('with the example from lecture 4 slides 40 and following', () => {
      const u_i = [0, 1, 2, 3, 3, 4, 5, 6]
      const degree = 2

      it('should guarantee the appropriate control point has full influence at u = 3', () => {
        expect(N(0, degree, 3, u_i)).toBe(0)
        expect(N(1, degree, 3, u_i)).toBe(0)
        expect(N(3, degree, 3, u_i)).toBe(0)
        expect(N(4, degree, 3, u_i)).toBe(0)

        expect(N(2, degree, 3, u_i)).toBe(1)
      })
    })

    it('should work', () => {
      expect(N(0, 2, 0, [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2])).toBe(1)
    })
  })
})

xdescribe('BSpline', () => {
  it('should return the correct usable u values', () => {
    const bSpline = new BSpline(
      3,
      createEquidistantVector(3, 5),
      new BasePoints([
        new paper.Point(0, 0),
        new paper.Point(0, 1),
        new paper.Point(1, 1),
        new paper.Point(1, 0),
        new paper.Point(2, 0),
      ]),
    )

    expect(bSpline.usableUValues).toMatchObject([3, 4, 5])
  })
})
