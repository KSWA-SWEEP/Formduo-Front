# 가동중인 awsstudy 도커 중단 및 삭제
sudo docker ps -a -q --filter "name=frontend-msa" | grep -q . && docker stop frontend-msa && docker rm frontend-msa | true

# 기존 이미지 삭제
sudo docker rmi jongleur6596/frontend-msa

# 도커허브 이미지 pull
sudo docker pull jongleur6596/frontend-msa

# 도커 run
sudo docker run -d -p 3000:3000 --name frontend-msa jongleur6596/frontend-msa

# 사용하지 않는 불필요한 이미지 삭제 -> 현재 컨테이너가 물고 있는 이미지는 삭제되지 않습니다.
sudo docker rmi -f $(docker images -f "dangling=true" -q) || true