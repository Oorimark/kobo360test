import { Validate } from "../services/validate.service"


{ // test validate class

    const testInput = {
        "first_name": "mark",
        "last_name": "david",
        "gender": "male",
        "email": "oorimark@gmail.com",
        "phone": 9066317489,
        "address": "Alagbado, lagos",
        "bio": "Some Bio about me",
        "age": 34,
        "movies": ["The broken heart","The village girl"]
    };
    
    const testfunction = Validate.validateCharacterQuery(testInput)

    test("validating character query", () => {
        expect(testfunction.error).toBe(true)
    })

}