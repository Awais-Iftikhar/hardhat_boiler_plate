// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

error ZERO_ADDRESS();

contract StateVariables {
    //1) Variables declared in a contract that are not within any function are called state variables
    //2) State variables store the current values of the contract.
    //3) The allocated memory for a state variable is statically assigned and it cannot change during the lifetime of the contract.
    //4) Each state variable has a type that must be defined statically.
    //5) The Solidity compiler must ascertain the memory allocation details for each state variables and so the state variable data type must be declared.

    // State Variables
    int256 age = 40; // by default its qualifiers is 'internal'
    int256 private privateAge = 60;
    int256 public publicAge = 89;
    string name = "hello";
    int256 constant CONSTANT_AGE = 41; // by default its qualifiers is 'internal'
    int256 public constant CONSTANT_AGE_2 = 55; //todo
    int256 public constant CONSTANT_AGE_3 = 66;
    address public immutable ImmutableAddress;

    constructor() {
        ImmutableAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    function getInternalAge() public view returns (int256) {
        return age;
    }

    function getPrivateAge() internal view returns (int256) {
        return privateAge;
    }

    function getPublicAge() public view returns (int256) {
        return publicAge;
    }

    function getConstantAge() public pure returns (int256) {
        return CONSTANT_AGE;
    }

    function getConstantAge2() public pure returns (int256) {
        return CONSTANT_AGE_2;
    }

    function getConstantAge3() public pure returns (int256) {
        return CONSTANT_AGE_3;
    }
}

contract StateVariables2 is StateVariables {
    // use of internal state variable
    function getAge() public view returns (int256) {
        return age;
    }

    function getPrivateAgeNew() public view returns (int256){
        return getPrivateAge();
    }

    function setAge(int256 a) public {
        age = a;
    }

    function setAge2(int256 a) public {
        age = a;
    }

    function doSomeWork() internal pure returns (string memory) {
        return "Do Some Work Internal";
    }

    function doSomeWork2() private view returns (string memory) {
        return name;
    }

    function doSomeWork3() external pure returns (string memory) {
        return "Do Some Work External";
    }

    function doSomeWork4() public pure returns (string memory) {
        // This line will give compilation error because
        // external functions can only be called from outside
        // Uncomment this and it will give compile time error
        // doSomeWork3();

        return "Do Some Work public";
    }

    function doSomeWork5() public view returns (string memory) {
        return doSomeWork2();
    }


    // pure function
    function doSomeWork4(int256 b) public pure returns (int256) {
        // Compilation error, on both changing state variable or access
        // state variable

        // access or assignment not allowed
        // age = b;  // not allowed, uncoment and try
        // b = age;  // not allowed, uncoment and try
        return b;
    }

    // Returning multiple values from function
    function doSomeWork6() public pure returns (int256, string memory) {
        return (5, "hello");
    }

    //paybale is global modifier/built in modifier in solidity
    function doAcceptEther(address to) public payable {
        if (to == address(0)) {
            revert("invalid address");
        }
        payable(to).transfer(msg.value);
    }
}


// interface IStateVariable2 {
//     function doSomeWork3(string memory _value) external pure returns (string memory);
// }


// contract stateVariable3{
//     IStateVariable2 sv;
//     constructor(IStateVariable2 addr){
//          sv = IStateVariable2(addr);
//     }
//     function doWork() public view returns(string memory){
//         return sv.doSomeWork3("do 3");
//     }

// }