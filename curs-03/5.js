class ParentType {
  constructor (a) {
    this.a = a
  }

  doParent () {
    console.log('doing parent stuff with a ' + this.a)
  }
}

class ChildType extends ParentType {
  constructor (a, b) {
    super(a)
    this.b = b
  }

  doChild () {
    console.log('doing child stuff with a and b ' + this.a + ' ' + this.b)
  }
}

const c0 = new ChildType(1, 2)
c0.doChild()

c0.doParent()

// c0.doNewStuff =
ChildType.prototype.doNewStuff = function () {
  console.log('doing new stuff')
}
c0.doNewStuff()

console.log(c0.doParent.length)

const f = c0.doParent

// f()

f.call(c0)

const f1 = f.bind(c0)
f1()
