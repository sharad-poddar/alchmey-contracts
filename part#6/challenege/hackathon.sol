//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
contract Hackathon{

    ///@notice blueprint of project
    struct Project{
        string title;
        uint[] ratings;
    }
    Project[] projects;

    ///@notice making an new project
    function newProject(string calldata _title) external{
        projects.push(Project(_title, new uint[](0)));
    }

    ///@notice rating an project
    function rate(uint _idx, uint _rating) external{
        projects[_idx].ratings.push(_rating);
    }

    ///@notice retuning the project which has max average rating
    function findWinner() external view returns(Project memory){
        
        Project memory winnerProject;
        uint maxi=0;
        for(uint i=0;i<projects.length;i++){
            uint sum=0;
            uint n = projects[i].ratings.length;
            for(uint j=0;j<n;j++){
                sum = sum + projects[i].ratings[j];
            }
            uint average = sum / n;
            if(average >= maxi){
                maxi = average;
                winnerProject = projects[i];
            }
        }
        return winnerProject;
    }
}