// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// Difference between abstract contract and an interface
// An interface cannot have a constructor while an abstract contract can implement one.
// An interface cannot define state variables but an abstract contract can.
// An inheriting contract must implement all the functions defined in an interface while in an abstract contract the inheriting contract must implement at least one function of the abstract contract.
// An abstract contract can inherit from another contract or abstract contract while an interface cannot inherit from a contract or another interface.
// Interfaces and abstract contracts are arsenals in our toolkit that we could use for the development of smart contracts.

 abstract contract SayHello {
    uint256 public age;

    constructor(uint256 _age) {
        age = _age;
    }

    function getAge() public view virtual returns (uint256) {
        return age;
    }

    function setAge(uint256 _age) external virtual;
    

    function makeMeSayHello() external pure returns (string memory) {
        return "Hello";
    }
}

contract Hello is SayHello {
    string public name;

    constructor(string memory _name, uint256 _age) SayHello(_age) {
        name = _name;
    }

    function makeMeSayHello2() external view returns (string memory,uint256) {
        return (name,age);
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getAge() public view virtual override returns (uint256) {
        return 80;
    }

    function setAge(uint256 _age) public virtual override {
        age = _age;
    }
}

interface IHello {
    function getAge() external view returns (uint256);

    function getName() external view returns (string memory);
}

abstract contract IERC20 {
    function getSymbol() external view returns(uint256){
        return 11;
    }

    function getTotalSupply() external virtual view returns(uint256);


}

abstract contract IMeta20 is IERC20 {
    function name() external pure returns (string memory){
        return "hello";
    }

 
    function decimals() external virtual view returns (uint8);


}

contract main is IERC20, IMeta20{
    function decimals() external override pure returns (uint8){
        return 18;
    }
    function getTotalSupply() external override pure returns(uint256){
        return 1000;
    }



}

contract ExternalCaller {
    IHello hello;

    constructor(IHello _hello) {
        require(address(_hello) != address(0), "ZERO ADDRESS");
        hello = _hello;
    }

    function getAgeandName() public view returns(uint256, string memory) {
        return (hello.getAge(), hello.getName());
    }
}
