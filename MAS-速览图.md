# Multi-Agent Systems 一句话速览图

```mermaid
graph TD
    A[Multi-Agent Systems] --> B[通信 Communication]
    A --> C[协调 Coordination]
    B --> B1[黑板 Blackboard: 共享内存, 松耦合]
    B --> B2[消息 Message: 点对点, 紧耦合]
    C --> C1[合同网 Contract-Net: 招标-投标-中标, 任务拍卖]
    C --> C2[共识 Consensus: 投票/PBFT, 一致性]
    C --> C3[分层 Hierarchy: 上级分配, 确定性]
```

## 怎么用
1. 先画黑板：所有 Agent 把子任务/中间结果写上去，谁有空谁领。→ 解耦最高。  
2. 急活走消息：直接 @ 对应角色，低延迟。  
3. 任务拆分用合同网：Manager 发「招标」→ 各 Agent 回「投标（报价/时长）」→ 选最优「中标」。  
4. 要一致再共识：关键决策投票，防脑裂。  

## 口诀
黑板松耦合，消息点对点；合同网拍卖，共识保一致。